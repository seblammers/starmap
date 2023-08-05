<div class="landing">
  <div class="heading flow">
    <h1>Stories from <br /> the night sky</h1>

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
    min-height: 70vh;

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

    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
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
  }

  @keyframes bounce {
    50% {
      transform: translateY(-20%);
    }
  }
</style>
