import { useState, useEffect } from "react"
import { Transaction } from "../state/Transaction";
import { toast } from "react-toastify";

export const useFetch = (method = "GET") => {
   const url = 'http://localhost:3000/transactions';
   const [data, setData] = useState<Transaction[]>();
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

   const postData = async (postData: any) => {
      setIsPending(true);
      setSuccess("");
      try {
         const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
         });

         if (!res.ok) {
            toast.error("error!", { autoClose: 3000, hideProgressBar: true });
            throw new Error(res.statusText);
         }
         const data = await res.json();
         setIsPending(false);
         setData(data);
         setError("");
         setSuccess("true");
         toast.success("success!", { autoClose: 3000, hideProgressBar: true });
      } catch (err: any) {
         if (err.name === "AbortError") {
            console.log("the fetch was aborted")
         } else {
            setIsPending(false)
            setError('Could not fetch the data')
            toast.error("Could not fetch the data", { autoClose: 3000, hideProgressBar: true });

         }
      }
   }

   const deleteData = async (id: string) => {
      try {
         await fetch(url + '/' + id, { method: 'DELETE' });
         toast.success("Data removed correctly!", { autoClose: 3000, hideProgressBar: true });
      } catch (err) {
         console.log(err);
         toast.error("Error! Problem with removing data.", { autoClose: 3000, hideProgressBar: true });
      }
   }

   const getData = async () => {
      const controller = new AbortController()
      setIsPending(true)

      try {
         const res = await fetch(url, { signal: controller.signal })
         if (!res.ok) {
            throw new Error(res.statusText)
         }
         const data = await res.json();
         setIsPending(false);
         setData(data);
         setError("");
      } catch (err: any) {
         if (err.name === "AbortError") {
            console.log("the fetch was aborted");
         } else {
            setIsPending(false)
            setError('Could not fetch the data');
            toast.error("Could not fetch the data", { autoClose: 3000, hideProgressBar: true });
         }
      }
   }

   useEffect(() => {
      const controller = new AbortController()

      const fetchData = async () => {
         setIsPending(true)

         try {
            const res = await fetch(url, { signal: controller.signal })
            if (!res.ok) {
               throw new Error(res.statusText)
            }
            const data = await res.json()
            setIsPending(false)
            setData(data)
            setError("")
         } catch (err: any) {
            if (err.name === "AbortError") {
               console.log("the fetch was aborted")
            } else {
               setIsPending(false)
               setError('Could not fetch the data');
               toast.error("Could not fetch the data", { autoClose: 3000, hideProgressBar: true });
            }
         }
      }

      // invoke the function
      fetchData();

      return () => {
         controller.abort();
      }

   }, [method])

   return { data, isPending, error, success, postData, getData, deleteData }
}
