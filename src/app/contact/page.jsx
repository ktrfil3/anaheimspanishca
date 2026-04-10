"use client";
import "./contact.css";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";

const Page = () => {
  return (
    <section className="contact">
      <div className="contact-copy">
        <div className="contact-col">
          <Copy delay={0.8}>
            <h2>Si estás interesado en saber quienes somos te invitamos a conocernos.</h2>
          </Copy>
        </div>

        <div className="contact-col">
          <div className="contact-group">
            <Copy delay={0.8}>
              <p className="sm">Number</p>
              <p> +1 714-956-2726</p>
            </Copy>
          </div>

          <div className="contact-group">
            <Copy delay={1.2}>
              <p className="sm">Base</p>
              <p>1457 E Romneya Dr, Anaheim, CA 92805, Estados Unidos</p>
            </Copy>
          </div>

          <div className="contact-mail">
            <Button delay={1.3} href="/">
              arieldtt@yahoo.com
            </Button>
          </div>

          <div className="contact-group">
            <Copy delay={1.4}>
              <p className="sm">Credits</p>
              <p>Created by Neuronix</p>
              <p>Edition 2026</p>
            </Copy>
          </div>
        </div>
      </div>

      <div className="contact-footer">
        <div className="container">
          <Copy delay={1.6} animateOnScroll={false}>
            <p className="sm">Made in Motion</p>
          </Copy>

          <div className="contact-socials">
            <Copy delay={1.7} animateOnScroll={false}>
              <a
                className="sm"
                href="https://www.instagram.com/pacificunionsda/"
                target="_blank"
              >
                Instagram
              </a>
            </Copy>

            <Copy delay={1.8} animateOnScroll={false}>
              <a
                className="sm"
                href="https://www.youtube.com/channel/UCn5gXpqZeawtym15Uq2tZgQ"
                target="_blank"
              >
                YouTube
              </a>
            </Copy>

            <Copy delay={1.9} animateOnScroll={false}>
              <a
                className="sm"
                href="https://www.facebook.com/IglesiaAdventistaHispanadeAnaheim"
                target="_blank"
              >
                Facebook
              </a>
            </Copy>
          </div>
          <Copy delay={2} animateOnScroll={false}>
            <p className="sm">&copy; Anaheim Spanish Seventh-day Adventist Church</p>
          </Copy>
        </div>
      </div>
    </section>
  );
};

export default Page;
