'use client'

import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";


export default function Home() {
  const [originalLink, setOriginalLink] = useState<string>('')
  const [isCustomizado, setIsCustomizado] = useState<boolean>(false);
  const [linkCustomizado, setLinkCustomizado] = useState<string>('');
  const [shortLink, setShortLink] = useState<string>('')
  const [base64, setBase64] = useState <string>('')

  function handleValue(value: boolean) {
    setIsCustomizado(value);
    setLinkCustomizado("")
  }


  async function handleSubmit() {

    const shortId = isCustomizado && !!linkCustomizado ? linkCustomizado : null

    const body = {
      url: originalLink,
      shortId: shortId,
    }
    const response = await axios.post("http/localhost:3333/shorten", body);
    setShortLink(`http://localhost:3000/${response.data.shortId}`)
  }

  async function handleSubmitQrcode() {
    const body ={
      url:originalLink
    }
    const response = await axios.post("http/localhost:3333/Qr-code", body)
    setBase64(response.data.base64)
    }

  return (
    <div className={styles.conteiner}>
      <div className={styles.content}>

        <h1>Encurtador de link Gerador de QRcode</h1>
        <input
          type="text" placeholder=" colar link"
          value={originalLink}
          onChange={(e) => setOriginalLink(e.target.value)} />

        <div className={styles.customizeLinke}>
          <span>Customizar URL:</span>
          <input type="checkbox" checked={isCustomizado} onChange={(e) => handleValue(e.target.checked)} />
          <input type="text"
            placeholder="Link customizado"
            value={linkCustomizado}
            onChange={(e) => setLinkCustomizado(e.target.value)}
            disabled={!isCustomizado} />
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={handleSubmit}>Ecutar Link</button>
          <button onClick={handleSubmitQrcode}>Gerador QRcode</button>
        </div>
      </div>

      <div className={styles.content}>
        <h1>Link Curto:{shortLink} </h1>
        {!!base64 && <img src={base64}></img>}
      </div>
    </div>
  );
}
