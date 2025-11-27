"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "./BookingForm.module.css";
import * as Yup from "yup";

const DatePicker = dynamic(() => import("../DatePickerNoSSR/DatePickerNoSSR"), {
  ssr: false,
  loading: () => <input className={styles.input} placeholder="Booking date" />,
});

interface BookingFormProps {
  className?: string;
  carId?: string;
  carName?: string;
}

interface FormValues {
  name: string;
  email: string;
  comment: string;
  bookingDate: string;
  carId: string;
}

export default function BookingForm({
  className,
  carId,
  carName,
}: BookingFormProps) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/izitoast/dist/css/iziToast.min.css";
    document.head.appendChild(link);
  }, []);

  const showToast = (
    type: "success" | "error",
    title: string,
    message: string
  ) => {
    if (typeof window === "undefined") return;

    import("izitoast")
      .then((module) => {
        const iziToast = module.default;
        iziToast[type]({
          title,
          message,
          position: "topCenter",
          timeout: 3000,
        });
      })
      .catch(() => {
        alert(`${title}: ${message}`);
      });
  };

  const initialValues: FormValues = {
    name: "",
    email: "",
    comment: "",
    bookingDate: "",
    carId: carId || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required field"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Required field"),
    bookingDate: Yup.string().required("Required field"),
    carId: Yup.string().required("Choose a car"),
  });

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await new Promise((res) => setTimeout(res, 1000));

      showToast(
        "success",
        "Success!",
        "Your booking request has been successfully sent!"
      );

      resetForm();
    } catch {
      showToast("error", "Error", "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      <h3 className={styles.titleForm}>
        {carName ? `Book ${carName}` : "Book a car now"}
      </h3>

      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          touched,
          errors,
          values,
        }) => (
          <Form className={styles.form}>
            <Field type="hidden" name="carId" />

            <div className={styles.inputWrapper}>
              <Field
                name="name"
                placeholder="Name*"
                className={`${styles.input} ${
                  touched.name && errors.name ? styles.inputError : ""
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.inputWrapper}>
              <Field
                name="email"
                type="email"
                placeholder="Email*"
                className={`${styles.input} ${
                  touched.email && errors.email ? styles.inputError : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.inputWrapper}>
              <DatePicker
                selected={
                  values.bookingDate ? new Date(values.bookingDate) : null
                }
                onChange={(date: Date | null) => {
                  const dateString = date ? date.toISOString() : "";
                  setFieldValue("bookingDate", dateString);
                  setFieldTouched("bookingDate", true, false);
                }}
                placeholderText="Booking date"
                className={`${styles.input} ${
                  touched.bookingDate && errors.bookingDate
                    ? styles.inputError
                    : ""
                }`}
              />
              <ErrorMessage
                name="bookingDate"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.inputWrapper}>
              <Field
                name="comment"
                as="textarea"
                placeholder="Comment"
                className={`${styles.input} ${styles.textarea}`}
                rows={4}
              />
            </div>

            <button
              type="submit"
              className={`${styles.formBtn} ${
                isSubmitting ? styles.buttonLoading : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
