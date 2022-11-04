import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`
  );
  const data = await res.json();

  return {
    props: {
      book: data,
    },
  };
}

const BookEdit = ({ book }) => {
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState(book.title);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
          _method: "PATCH",
        }),
      }
    );

    if (res.ok) {
      setErrors([]);
      setBookTitle("");
      return router.push("/libros");
    }

    const data = await res.json();
    setErrors(data.errors);
    setSubmitting(false);
  }

  return (
    <>
      <h1>Book Edit</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setBookTitle(e.target.value)}
          disabled={submitting}
          value={String(bookTitle)}
          data-cy="input-book-title"
        />
        <button disabled={submitting} data-cy="button-submit-book">
          {submitting ? "Enviando ..." : "Enviar"}
        </button>

        {errors.title && (
          <span style={{ color: "red", display: "block" }}>{errors.title}</span>
        )}
      </form>

      <br />

      <Link href="/libros">Listado de Libros</Link>
    </>
  );
};

export default BookEdit;
