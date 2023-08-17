<form
  class="flow"
  name="contact-form"
  action="/contact/success"
  method="POST"
  netlify-honeypot="bot-field"
  data-netlify="true"
>
  <input type="hidden" name="form-name" value="contact-form" />

  <div class="form-section">
    <label for="name">Name</label>
    <input name="name" id="name" required placeholder="Your Name" type="text" />
  </div>
  <div class="form-section">
    <label for="email">Email</label>
    <input
      name="email"
      id="email"
      required
      placeholder="Your Email"
      type="email"
    />
  </div>
  <div class="form-section">
    <label for="message">Message</label>
    <textarea
      name="message"
      id="message"
      required
      placeholder="Your Message"
      rows="8"
      cols="95"
    />
  </div>

  <input type="submit" value="Submit" class="align-right" />
  <a class="button-standard" href="/#map">&larr; Back to the map</a>
</form>

<style>
  label {
    font-weight: bold;
    display: inline-block;
  }
  input,
  textarea {
    display: block;
    font-size: inherit;
    padding: var(--space-2xs);
    border-radius: var(--radius);
    border: 1px solid var(--light);
    width: 100%;
    accent-color: var(--accent);
    background-color: var(--light);
  }
  input[type="submit"],
  .button-standard {
    padding: var(--space-s) var(--space-s);
    margin: var(--space-s) 0 var(--space-s);
    max-width: fit-content;
    float: right;
  }
  .button-standard {
    float: left;
  }
</style>
