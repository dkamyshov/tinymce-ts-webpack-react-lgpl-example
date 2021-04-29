export const loadScript = (url: string) => {
  return new Promise<void>((resolve) => {
    const element = document.createElement("script");
    element.src = url;
    element.onload = () => resolve();
    document.head.appendChild(element);
  });
};
