<div class="landing">
  <div class="heading flow">
    <h1>[*] <br />Stories from <br /> the night sky</h1>

    <p>A data-driven visual experiment.</p>

    <div class="byline">
      By <a href="https://sebastianlammers.com/" target="_blank"
        >Sebastian Lammers</a
      >
    </div>
  </div>
  <div class="scroll" />
</div>

<style>
  .landing {
    min-height: 65vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
  }

  .heading {
    --flow-space: var(--space-m);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;

    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
    transition-property: text-shadow;
    transition-duration: 0.5s;
  }

  .heading:hover {
    text-shadow: 0 0 20px var(--light), 0 0 30px var(--dark),
      0 0 40px var(--dark), 0 0 50px var(--dark), 0 0 60px var(--dark),
      0 0 70px var(--dark), 0 0 80px var(--dark);
  }

  .byline {
    font-variant-caps: small-caps;
    font-size: var(--step-1);
  }
  .scroll {
    position: relative;
    width: 100%;
  }

  .scroll::before {
    animation: bounce 1s ease infinite;

    color: var(--accent);
    content: "↓";
    font-size: var(--step-4);

    left: 50%;

    position: absolute;
    text-align: center;
    text-shadow: 0 0 20px var(--light), 0 0 30px var(--dark),
      0 0 40px var(--dark), 0 0 50px var(--dark), 0 0 60px var(--dark),
      0 0 70px var(--dark), 0 0 80px var(--dark);
  }

  @keyframes bounce {
    50% {
      transform: translateY(-10%);
    }
  }
</style>
