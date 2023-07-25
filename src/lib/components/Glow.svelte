<defs>
  <filter id="glow" width="400%" height="400%" x="-200%" y="-200%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="15" />
    <feOffset dx="0" dy="0" result="offsetblur" />
    <feFlood flood-color="white" />
    <feComposite in2="offsetblur" operator="in" />
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>
