export const isPizzaRequestValid = (data) => {
  if (data === undefined || data === null) {
    return false;
  }
  const request = data;
  const requestKeys = Object.keys(request);
  const requiredKeys = ["naziv", "slika_url", "sastojci", "cijene"]; //provjeravam slika_url ali ne prikazujem na frontendu, frontend mi je isti iz WA3 samo je dodana filtering komponenta, cijene bi se isto mogle validirati odnosno formatirati u odgovarajuci format tako da mongo ne reze nule na kraju
  const requiredKeysOfSastojci = ["naziv", "url"];
  const checkRequiredKeys = requiredKeys.every((key) =>
    requestKeys.includes(key)
  );
  if (!checkRequiredKeys) {
    return false;
  }
  const checkRequestKeys = requestKeys.every(
    (key) => requiredKeys.includes(key) //stroga provjera
  );
  if (!checkRequestKeys) {
    return false;
  }

  if (
    !request?.cijene.mala ||
    isNaN(request?.cijene.mala) ||
    !request.cijene.srednja ||
    isNaN(request?.cijene.srednja) ||
    !request.cijene.jumbo ||
    isNaN(request?.cijene.jumbo)
  ) {
    return false;
  }

  if (request?.sastojci.length === 0) {
    return false;
  }
  // //u WA3 zadaci ikonice sastojaka sam držao u folderu assets i bindao ikonicu sa svakim sastojkom pizze, sada pošto imamo db ikonice sam stavio na cdn i url spremam u bazu key url
  const checkKeysOfSastojci = request?.sastojci.every((key) => {
    const itemKeys = Object.keys(key);
    const itemValues = Object.values(key);

    if (itemKeys.length !== 2) {
      return false;
    }
    const checkRequiredKeysOfItem = requiredKeysOfSastojci.every((key) =>
      itemKeys.includes(key)
    );

    if (!checkRequiredKeysOfItem) {
      return false;
    }

    const checkKeysOfItem = itemKeys.every(
      (key) => requiredKeysOfSastojci.includes(key) //stroga provjera
    );

    if (!checkKeysOfItem) {
      return false;
    }

    const checkValuesOfItem = itemValues.every(
      (key) => typeof key === "string" && key !== ""
    );

    if (!checkValuesOfItem) {
      return false;
    }

    return true;
  });

  if (!checkKeysOfSastojci) {
    return false;
  }

  return true;
};

export const isOrderRequestValid = (data) => {
  if (data === undefined || data === null) {
    return false;
  }
  const request = data;
  const requestKeys = Object.keys(request);
  const requiredKeys = ["ime", "adresa", "telefon", "narucene_pizze"];
  const requiredKeysOfNarucenePizze = ["naziv", "kolicina", "velicina"];

  const checkRequiredKeys = requiredKeys.every((key) =>
    requestKeys.includes(key)
  );

  if (!checkRequiredKeys) {
    return false;
  }

  const checkRequestKeys = requestKeys.every(
    (
      key //stroga provjera
    ) => requiredKeys.includes(key)
  );

  if (!checkRequestKeys) {
    return false;
  }

  if (isNaN(request?.telefon) || !request?.telefon) {
    return false;
  }

  if (request?.narucene_pizze.length === 0) {
    return false;
  }

  const checkKeysOfNarucenePizze = request?.narucene_pizze.every((key) => {
    const itemKeys = Object.keys(key);
    if (itemKeys.length !== 3) {
      return false;
    }
    const checkRequiredKeysOfItem = requiredKeysOfNarucenePizze.every((key) =>
      itemKeys.includes(key)
    );
    if (!checkRequiredKeysOfItem) {
      return false;
    }
    const checkKeysOfItem = requiredKeysOfNarucenePizze.every(
      (key) => itemKeys.includes(key) //stroga projvera
    );
    if (!checkKeysOfItem) {
      return false;
    }
    return true;
  });

  if (!checkKeysOfNarucenePizze) {
    return false;
  }

  return true;
};
