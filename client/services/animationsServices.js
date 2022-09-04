export const getMultipleFiles = async () => {
    try {
      const { data } = await axios.get(
        "https://shell-create.herokuapp.com/api/" + "getMultipleFiles"
      );

      return data;
    } catch (error) {
      console.log("MUltiple Files Data Erro", error);
      throw error;
    }
};

export  const getIconsAnimFiles = async () => {
    try {
      const { data } = await axios.get(
        "https://shell-create.herokuapp.com/api/" + "getMultipleFiles"
      );
    //   iconsArray = data[3].files;
    //   console.log("MUltiple Files Data", iconsArray);
    //   iconsArray.forEach((character) => {
    //     console.log("CHARACTER", character);
    //     iconsPathArray.push(character.filePath);
    //     console.log("ICONSPATHS", iconsPathArray);
    //   });
      return data;
    } catch (error) {
      console.log("MUltiple Files Data Erro", error);
      throw error;
    }
  };

  export const getFilesByTitle = async (title) => {
    try {
      const {data} = await axios.get(
        "https://shell-create.herokuapp.com/api/" + `getSearchedFiles?title=${title}`
      );
      console.log("RETURNED SEARCHED FILES", data)
      return data;
    } catch (error) {
      // console.log(error);
      throw error
    }
  }
  export const retrieveCanvasState = async () => {
    try {
      const {data} = await axios.get(
        "https://shell-create.herokuapp.com/api/" + `retrieveCanvas`
      );
      console.log("RETURNED SEARCHED FILES", data)
      return data;
    } catch (error) {
      // console.log(error);
      throw error
    }
  }

  export const saveCanvasState = async (canvas) => {
    try {
      const {data} = await axios.post(
        "https://shell-create.herokuapp.com/api/" + `saveCanvas?canvas=${canvas}`
      );
      console.log("Saved Canvas", data)
      return data;
    } catch (error) {
      // console.log(error);
      throw error
    }
  }

  export const saveSelectedAnimation = async (fileName) => {
    try {
      const {data} = await axios.post(
        "https://shell-create.herokuapp.com/api/" + `saveSelectedAnim?fileName=${fileName}`
      );
      console.log("Saved Animation", data)
      return data;
    } catch (error) {
      // console.log(error);
      throw error
    }
  }

