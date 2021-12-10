import { Well, TextField, Button, Form } from "@adobe/react-spectrum";

export default function AttributeEditor({ attributes, setAttributes, index }) {

  const updateAttribute = (key, value) => {
    const newAttributes = [...attributes];
    newAttributes[index] = {
      ...attributes[index],
      [key]: value
    };
    setAttributes(newAttributes);
  };

  const deleteAttribute = () => {
    setAttributes([
      ...attributes.slice(0,index),
      ...attributes.slice(index+1)
    ]);
  }

  const { path, value } = attributes[index];

  return (
    <Well>
      <Form>
        <TextField label="Path" value={path} onChange={newValue => updateAttribute("path", newValue)} />
        <TextField label="Value" value={value} onChange={newValue => updateAttribute("value", newValue)} />
        <div><Button onClick={deleteAttribute}>Delete</Button></div>
      </Form>
    </Well>
  );
}
