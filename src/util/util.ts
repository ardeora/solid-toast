export const generateID = (() => {
  let count = 0;
  return () => String(++count)
})()


