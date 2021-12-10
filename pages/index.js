import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useEffect, useState } from 'react';
import Link from "next/link";
import { Button } from "@adobe/react-spectrum";

export default function Home() {

  const [selectors, setSelectors] = useState();

  useEffect(async () => {
    const data = await fetch("/.netlify/functions/selector-read-all").then(response => response.json());
    setSelectors(data);
  }, []);

  const deleteSelector = async id => {
    await fetch(`/.netlify/functions/selector-delete/${id}`, { method: "POST" });
    setSelectors(selectors.filter(selector => selector.id !== id));
  };

  return (
    <div className="container">
      <Head>
        <title>Selectors</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <Header title="Selectors" />
        <table><tbody>
          {selectors && selectors.map(selector => (
            <tr key={selector.id}>
              <td>
                <Link href={`/selectors/${selector.id}`}>
                  <a>{selector.name}</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody></table>
        <Link href="/selectors/new">
          <Button>New Selector</Button>
        </Link>
      </main>

      <Footer />
    </div>
  )
}
