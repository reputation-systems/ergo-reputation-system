import { ErgoAddress, SByte, SColl, SConstant, SGroupElement } from "@fleet-sdk/core";
import { stringToBytes } from "@scure/base";

export function serializedToRendered(serializedValue: string): string {
    // Assuming the serialized value always starts with a pattern to strip (e.g., '0e')
    const patternToStrip = '0e';
    if (serializedValue.startsWith(patternToStrip)) {
        // Remove the pattern and return the hex string
        return serializedValue.substring(patternToStrip.length).substring(2);
    } else {
        // If the pattern does not exist at the start, return the original string
        return serializedValue.substring(2);
    }
}

export function hexToUtf8(hexString: string): string | null {
    // Asegúrate de que la cadena hexadecimal tenga una longitud par para que se pueda convertir correctamente
    if (hexString.length % 2 !== 0) {
      console.error('La cadena hexadecimal tiene una longitud impar');
      return null;
    }
  
    // Convierte la cadena hexadecimal a un array de bytes
    const byteArray = new Uint8Array(hexString.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  
    // Crea un nuevo TextDecoder para convertir el array de bytes a una cadena UTF-8
    const decoder = new TextDecoder('utf-8');
    const utf8String = decoder.decode(byteArray);
  
    return utf8String;
  }

export function generate_pk_proposition(wallet_pk: string): string {
    const pk = ErgoAddress.fromBase58(wallet_pk).getPublicKeys()[0];
    const encodedProp = SGroupElement(pk);
    return encodedProp.toHex();
}

export function stringToSerialized(value: string): string {
    return SConstant(SColl(SByte, stringToBytes('utf8', value)));
}

export function stringToRendered(value: string): string {
    return serializedToRendered(stringToSerialized(value));
}
