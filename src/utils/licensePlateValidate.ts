const LICENSE_PLATE_REGEX = '[A-Z]{3}[0-9][0-9A-Z]{2}';

export function licencePlateValidate(licensePlate: string) {
  const license = licensePlate.toUpperCase()

  const isValid = license.match(LICENSE_PLATE_REGEX)
  
  return isValid
}