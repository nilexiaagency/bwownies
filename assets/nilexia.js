window.addEventListener("alpine:init", () => {
  Alpine.data(
    "productCard",
    ({ inStock, inStockString, initialPrice }) => ({
      // initial props
      inStock,
      inStockString,
      initialPrice,

      // local state
      variants: [],
      addingToCart: false,
      inStockText: "",

      init() {
        // Initialize button text for this specific card instance
        this.inStockText = `${this.inStockString} ${this.initialPrice}`;

        const variantScriptEl = this.$refs.variants;
        if (variantScriptEl) {
          const variantData = variantScriptEl.textContent;
          this.variants = JSON.parse(variantData);
        }
      },

      handleVariantChange(newVariantId) {
        const newVariant = this.variants.find(
          (variant) => variant.id == newVariantId,
        );
        if (!newVariant) return;

        this.inStock = newVariant.available;
        this.inStockText = `${this.inStockString} ${formatMoney(
          newVariant.price,
        )}`;
      },
    }),
  );
});
