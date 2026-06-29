import OnboardingForm from "@/components/OnboardingForm/OnboardingForm";
import css from "./OnboardingPage.module.css";

export default function OnboardingPage() {
  return (
    <main className={css.page}>
      <section className={css.card}>
        <div className={css.formSide}>
          <OnboardingForm />
        </div>

        <div className={css.imageSide} aria-hidden="true">
          <div className={css.illustration} />
        </div>
      </section>
    </main>
  );
}