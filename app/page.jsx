"use client"

import { useState } from "react";
import LabelPrimary from "../src/components/labels/LabelPrimary";

export default function Home() {

  const [settings, setSettings] = useState()
  const [image, setImage] = useState()

  const handleFileChange = (e) => {
    const files = e.target.files
    const file = files[0]

    //read an image file from the file input and get the image data
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()

      img.onload = () => {
        setImage({
          width: img.width,
          height: img.height,
          src: img.src,
          name: file.name,
        })
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  console.log(image);



return (
  <main className="w-full flex justify-center items-center max-w-4xl px-4 py-8 max-lg:flex-col m-auto gap-8 lg:gap-16 min-h-full text-black">
    <div className="card max-w-lg flex-1 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Settings</h2>
        <LabelPrimary title="File">
          <input type="file"
            className="file-input file-input-primary file-input-bordered file-input-sm w-full max-w-xs"
            onChange={(e) => handleFileChange(e)} />


        </LabelPrimary>
        <LabelPrimary title="Padding">
          <input type="range" min={0} max="100" defaultValue="50" className="range range-sm range-primary" />
        </LabelPrimary>
        <LabelPrimary title="Shadow">
          <input type="range" min={0} max="100" defaultValue="50" className="range range-sm range-primary" />
        </LabelPrimary>
        <LabelPrimary title="Radius">
          <input type="range" min={0} max="100" defaultValue="50" className="range range-sm range-primary" />
        </LabelPrimary>
      </div>

    </div>
    <div>preview</div>
  </main>
);
}
