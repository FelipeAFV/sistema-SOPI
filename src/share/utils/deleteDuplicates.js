module.exports.borrarRepetidos =(array) =>{
    const copiaArray = [...array]; 
    const valoresRepetidos = []; 
  
    const arrayOrdenado = copiaArray.sort(
      (a, b) => a.id - b.id,
      0
    ); 

    for (let i = 1; i < arrayOrdenado.length; i++) {
      if (arrayOrdenado[i - 1].id === arrayOrdenado[i].id) {
        if (!valoresRepetidos.includes(arrayOrdenado[i].id)) {
           
          valoresRepetidos.push(arrayOrdenado[i].id);
        }
      }
    }
    console.log(arrayOrdenado)
    return arrayOrdenado.filter(
      (item) => !valoresRepetidos.includes(item.id)
    );
  };
