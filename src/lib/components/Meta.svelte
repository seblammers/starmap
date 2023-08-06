<script>
  // Required props
  export let url = "https://storiesfromthenightsky.netlify.app/"; // Full URL of the current page
  export let title = "Stories from the night sky"; // Page title
  export let description = "A data-driven visual experiment."; // Page description

  // Optional props
  export let website = "https://storiesfromthenightsky.netlify.app/"; // Website URL
  export let authorName = "Sebastian Lammers"; // Author name
  export let image = "https://storiesfromthenightsky.netlify.app/og-image.png"; // Open Graph image URL
  export let paymentPointer = ""; // Web Monetization payment pointer
  export let datePublished = ""; // ISO 8601 format
  export let dateModified = ""; // ISO 8601 format
  export let contentType = "WebPage";
  export let language = "en";
  export let authorType = "Person";
  export let authorUrl = "https://sebastianlammers.com/";
</script>

<svelte:head>
  <link rel="canonical" href={url} />

  <!-- HTML Meta Tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  {#if authorName}
    <meta name="author" content={authorName} />
  {/if}

  <!-- Google / Search Engine Tags -->
  {#if image}
    <meta itemprop="name" content={title} />
    <meta itemprop="description" content={description} />
    <meta itemprop="image" content={image} />
  {/if}

  <!-- Facebook Meta Tags -->
  {#if image}
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
  {/if}

  <!-- Twitter Meta Tags -->
  {#if image}
    <meta name="twitter:card" content="summary_large_image" />
    {#if website}
      <meta property="twitter:domain" content={website} />
    {/if}
    <meta property="twitter:url" content={url} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  {/if}

  <!-- Monetisation -->
  {#if paymentPointer}
    <meta name="monetization" content={paymentPointer} />
  {/if}
</svelte:head>
