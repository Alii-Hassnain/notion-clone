"use client"
import React from 'react'
import { Button } from './ui/button'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createNewDocument } from '../../actions/actions'

const NewDocumentButton = () => {
  const [isPending, startTrasition] = useTransition();
  const router = useRouter()
  const handleCreateNewDocument = () =>{
    startTrasition(async ()=>{
       const {docId} = await createNewDocument(); 
       router.push(`/doc/${docId}`)
    })
  }
  return (
    <div className='flex justify-center p-4'>
      <Button className='cursor-pointer' onClick={handleCreateNewDocument} disabled={isPending}>{isPending ? "Creating":"new Document"}</Button>
    </div>
  )
}

export default NewDocumentButton