'use client'

import { FileImage } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import MyModal from './Modal'

export default function ImageModal({ filename }) {
  // Modal control
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const segments = filename.split('-')
  const filenameWithoutID = segments.slice(1).join('-')

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="mt-5 bg-highlighted text-white flex gap-3 px-3 py-2 hover:brightness-110 transition-all"
      >
        <FileImage />
        {filenameWithoutID}
      </button>

      {/* Modal */}
      <MyModal isOpen={isOpen} handleClose={handleClose}>
        <div className="flex justify-center">
          <Image
            src={`/${filename}`}
            alt=""
            width={1000}
            height={1000}
            className="w-max h-max block object-cover"
            quality={100}
          />
        </div>
      </MyModal>
    </>
  )
}
