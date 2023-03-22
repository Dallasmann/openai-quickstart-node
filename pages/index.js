import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";




export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [language, setlanguage] = useState("français");
  const [loading, setLoading] = useState(false);



  async function onSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true); // Indique que la requête est en cours de traitement
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput, language }),
      });
  
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
  
      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false); // Indique que la requête est terminée
    }
  }

  return (
    <div>
      <Head>
        <title>Mouthly Translator</title>
        <link rel="icon" href="/mouth.png" />
      </Head>

      <main className={styles.main}>
        <img src="/mouth.png" className={styles.icon} />
        <h3>Mouthly Translator</h3>

        <select id="langues" value={language} onChange={(e) => setlanguage(e.target.value)} class={`${styles['deroulant']}`}>
		          <option value="français">Français</option>
		          <option value="anglais">Anglais</option>
		          <option value="espagnol">Espagnol</option>
		          <option value="allemand">Allemand</option>
		          <option value="portugais">Portugais</option>
		          <option value="italien">Italien</option>
		          <option value="néerlandais">Néerlandais</option>
		          <option value="russe">Russe</option>
		          <option value="chinois">Chinois</option>
		          <option value="japonais">Japonais</option>
			  <option value="Grecque">Grecque</option>
			  
	          </select>
            <form onSubmit={onSubmit}>
            <div class={`${styles['my-div']}`}>
              <textarea
             type="text"
              name="inputext"
              placeholder="write wour sentence"
              value={animalInput}
              onChange={(e) => setAnimalInput(e.target.value)}
              class={`${styles['text_input']}`}
              />
              <input type="submit" value="translate" disabled={loading} />

              <input type="text" name="outputext" value={result} class={`${styles['text_output']}`} />
              
            </div>
            </form>
      </main>
    </div>
  );
}
