"use client"

import { useState } from "react";
import LabelPrimary from "../src/components/labels/LabelPrimary";
import ImageGenerator from "../src/components/ImageGenerator/ImageGenerator";
import { renderPNG } from "@/app/render-png";

export default function Home() {

  const [settings, setSettings] = useState({
    padding: 16,
    shadow: 4,
    radius: 8,
  })
  const [image, setImage] = useState()
  const [loading, setLoading] = useState("idle")

  const setSetting = (name, value) => {
    setSettings((curr) => ({
      ...curr,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    const file = files[0]

    if(file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg"){
      alert("Please upload a valid image file")
      e.target.value = null
      return
    }

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

  const handleDownload = async (isCopy) => {

    setLoading(isCopy ? "copying" : "downloading")
    const { blob } = await renderPNG({
      image,
      settings,
    });
    const url = URL.createObjectURL(blob);

    if(isCopy){
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob
        })
      ])
    } else {

      // Fais en sorte de télécharger l'image ici
      const link = document.createElement("a");
      link.download = image.name.replace(".png", "-elevation.png");
      link.href = url;
      link.click();
    }
    setLoading("idle")

  }



  return (
    <main className="w-full flex justify-center items-center max-w-4xl px-4 py-8 max-lg:flex-col m-auto gap-8 lg:gap-16 min-h-full text-black">
      <div className="flex-1 flex items-center justify-center">
        <div className="card max-w-lg flex-1 bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Settings</h2>
            <LabelPrimary title="File">
              <input type="file"
                className="file-input file-input-primary file-input-bordered file-input-sm w-full max-w-xs"
                onChange={(e) => handleFileChange(e)} />


            </LabelPrimary>
            <LabelPrimary title="Padding">
              <input type="range" min={0} max="100" value={settings.padding} className="range range-sm range-primary"
                onChange={(e) => setSetting("padding", e.target.value)} />
            </LabelPrimary>
            <LabelPrimary title="Shadow">
              <input type="range" min={0} max="100" value={settings.shadow} className="range range-sm range-primary"
                onChange={(e) => setSetting("shadow", e.target.value)} />
            </LabelPrimary>
            <LabelPrimary title="Radius">
              <input type="range" min={0} max="100" value={settings.radius} className="range range-sm range-primary"
                onChange={(e) => setSetting("radius", e.target.value)} />
            </LabelPrimary>
          </div>

        </div>
      </div>
      {/* preview image */}
      <div className="flex-1 w-full max-w-lg gap-4 m-auto flex-col flex items-center lg:justify-center ">

        <div className="w-full h-fit border rounded-md max-w-[400px]">
          <ImageGenerator settings={settings} image={image} />
        </div>
        <button
          className="btn btn-primary"
          disabled={loading !== "idle" || !image}
          onClick={async () => {
            handleDownload(false);
          }}
        >
          Download
          {" "}
          {loading === "downloading" && (
            <span className="loading loading-spinner loading-sm loading-primary"></span>
          )}
        </button>
        <button
          className="btn"
          disabled={loading !== "idle" || !image}
          onClick={async () => {
            handleDownload(true);
          }}
        >
          Copy
          {" "}
          {loading === "copying" && (
            <span className="loading loading-spinner loading-sm loading-primary"></span>
          )}
        </button>
      </div>
    </main>
  );
}
