import { DEFAULT_IMAGE } from "@/common/constant";

export default {
  inserted(el, binding) {
    const onError = () => {
      el.classList.add("error-image");
      el.src = binding.value || DEFAULT_IMAGE;
    };

    el.addEventListener("error", onError);
  },
};
