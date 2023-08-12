<script>
  import { Layer } from "svelte-canvas";

  export let x = 0,
    y = 0,
    r = 1,
    fill = null,
    stroke = null,
    glow = false,
    strokeWidth = 1;

  $: render = ({ context }) => {
    context.fillStyle = fill;
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.fill();

    if (glow) {
      // Create a radial gradient
      // The inner circle is at x=110, y=90, with radius=30
      // The outer circle is at x=100, y=100, with radius=70
      let gradient = context.createRadialGradient(x, y, 0, x, y, r + 50);
      // Add two color stops
      gradient.addColorStop(0, "rgb(255, 255, 255, 0.02)");
      gradient.addColorStop(1, "rgb(255, 255, 255, 1)");

      context.fillStyle = gradient;
      context.strokeStyle = stroke;
      context.lineWidth = strokeWidth;
      context.arc(x, y, r + strokeWidth / 2, 0, 2 * Math.PI);
      context.stroke();
      context.fill();
    }
  };
</script>

<Layer {render} />
