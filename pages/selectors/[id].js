import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import AttributeEditor from '@components/AttributeEditor';
import { Form, TextField, Heading, Button } from '@adobe/react-spectrum';


export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState();
  const [attributes, setAttributes] = useState();
  const [innerTextRegex, setInnerTextRegex] = useState();
  const [priority, setPriority] = useState();
  const [selector, setSelector] = useState();
  const [urlRegex, setUrlRegex] = useState();

  useEffect(async () => {
    // for some reason id is null on the first load
    if (id) {
      let data;
      if (id === "new") {
        data = {
          name: "",
          attributes: [{ path: "", value: "" }],
          innerTextRegex: "",
          priority: "",
          selector: "",
          urlRegex: ""
        };
      } else {
        data = await fetch(`/.netlify/functions/selector-read/${id}`).then(response => response.json());
      }
      const {
        name: newName,
        attributes: newAttributes,
        innerTextRegex: newInnerTextRegex,
        priority: newPriority,
        selector: newSelector,
        urlRegex: newUrlRegex
      } = data;
      setName(newName);
      setAttributes(newAttributes);
      setInnerTextRegex(newInnerTextRegex);
      setPriority(newPriority);
      setSelector(newSelector);
      setUrlRegex(newUrlRegex);
      setLoaded(true);
    }
  }, [id]);

  const addAttribute = () => {
    setAttributes([
      ...attributes,
      {
        path: "",
        value: ""
      }
    ]);
  };

  const save = async () => {
    setSaving(true);
    const selector = {
      name,
      attributes,
      innerTextRegex,
      priority,
      selector,
      urlRegex
    };
    let path;
    if (id === "new") {
      path = "/.netlify/functions/selector-create";
    } else {
      path = `/.netlify/functions/selector-update/${id}`;
    }
    await fetch(path, {
      method: "POST",
      body: JSON.stringify(selector)
    });
    router.push("/");
  };

  const cancel = async () => {
    router.push("/");
  }

  const deleteSelector = async () => {
    await fetch(`/.netlify/functions/selector-delete/${id}`, { method: "POST" });
    router.push("/");
  };

  return (
    <div className="container">
      <Head>
        <title>Edit selector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title={`Edit selector ${id}`} />
        { loaded && (
          <Form width="size-6000">
            <TextField label="Name" value={name} onChange={setName} />
            <TextField label="Selector" value={selector} onChange={setSelector} />
            <TextField label="Inner text regex" value={innerTextRegex} onChange={setInnerTextRegex} />
            <TextField label="Url regex" value={urlRegex} onChange={setUrlRegex} />
            <TextField label="Priority" value={priority} onChange={setPriority} />

            <Heading level={4}>Attributes</Heading>
            <div>
              <Button onClick={addAttribute}>Add attribute</Button>
            </div>
            { attributes.map((attribute, index) => (
              <AttributeEditor
                key={index}
                attributes={attributes}
                index={index}
                setAttributes={setAttributes}
              />
            ))}
            <div>
              {saving && "Saving..."}
              {!saving && (<Button onClick={save}>Save</Button>)}
              <Button onClick={cancel}>Cancel</Button>
              {id !== "new" && (<Button onClick={deleteSelector}>Delete</Button>)}
            </div>
          </Form>
        )}
      </main>
      <Footer />
    </div>
  )
}
