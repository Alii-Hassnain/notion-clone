"use client"
import React from 'react'
import { Button } from './ui/button'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createNewDocumentAction } from '../../actions/createNewDocument'

const NewDocumentButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  const handleCreateNewDocument = () =>{
    startTransition(async ()=>{
       const {docId} = await createNewDocumentAction();
       console.log(docId);
       router.push(`/doc/${docId}`)
    })
  }
  return (
    <div >
      <Button className='cursor-pointer bg-amber-200' onClick={handleCreateNewDocument} disabled={isPending}>{isPending ? "Creating":"new Document"}</Button>
    </div>
  )
}

export default NewDocumentButton