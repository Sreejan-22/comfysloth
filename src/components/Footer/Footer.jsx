import "./Footer.scss";

const Footer = (props) => {
  return (
    <footer
      className={
        props.hasOwnProperty("absolute") && props.absolute === "true"
          ? "footer-absolute"
          : null
      }
    >
      <div>
        &copy; {new Date().getFullYear()} <span>Comfy Sloth</span> All Rights
        Reserved
      </div>
    </footer>
  );
};

export default Footer;
