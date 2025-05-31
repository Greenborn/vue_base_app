export function get_dictionary_from_array( array, key, type = 'array' ){
    let dictionary = {}
    for (let i = 0; i < array?.length; i++)
        if (array[i][key]) {
        if (!dictionary[array[i][key]])
            dictionary[array[i][key]] = []
        if (type == 'array')
            dictionary[array[i][key]].push( array[i] )
        else
            dictionary[array[i][key]] = array[i]
        }
    return dictionary
}

export function fechaDateToString( fecha, separador, mostrar_hora = true ){
  
  if (fecha == null){
    return null
  }
  let salida = fecha.getFullYear() + separador + defineCantDigitosInt(fecha.getMonth() + 1, 2) + separador + defineCantDigitosInt(fecha.getDate(),2)
  
  if (mostrar_hora)
    salida += ' ' + defineCantDigitosInt(fecha.getHours(),2)+':'+defineCantDigitosInt(fecha.getMinutes(),2)+':'+defineCantDigitosInt(fecha.getSeconds(),2)
  return salida
}

export function defineCantDigitosInt( numero, cant){
  numero = String(numero)
  let ceros = ''
  for(let c=0; c < (cant - numero.length); c++){
    ceros += '0'
  }
  return ceros+numero
}