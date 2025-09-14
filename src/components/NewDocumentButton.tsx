"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createNewDocumentAction } from "../../actions/createNewDocument";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

const NewDocumentButton = () => {
  const { user } = useUser();
  const userId = user?.id;

  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: createDoc, isPending } = useMutation<string>({
    mutationFn: async () => {
      const { docId } = await createNewDocumentAction();
      return docId;
    },
    onSuccess: (docId) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["documentTitle"] });
      router.push(`/doc/${docId}`);
    },
  });

  return (
    <div>
      <Button
        className="cursor-pointer bg-amber-200"
        onClick={() => createDoc()}
        disabled={isPending}
      >
        {isPending ? "Creating" : "new Document"}
      </Button>
    </div>
  );
};

export default NewDocumentButton;
