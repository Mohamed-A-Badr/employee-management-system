import re

import phonenumbers
from rest_framework.exceptions import ValidationError


def valid_email(email):
    regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return re.match(regex, email) is not None


def valid_password(password):
    regex = r"[A-Za-z0-9@#$%^&+=]{8,}"
    return re.findall(regex, password) is not None


def valid_phone_number(phone):
    try:
        phone_number = phonenumbers.parse(phone, "EG")

        if not phonenumbers.is_valid_number(phone_number):
            raise ValidationError("Invalid Egyptian phone number format.")

        valid_prefixes = ("+2010", "+2011", "+2012", "+2015")
        if not any(str(phone).startswith(prefix) for prefix in valid_prefixes):
            raise ValidationError("Phone number must be an Egyptian mobile number.")

    except phonenumbers.NumberParseException:
        raise ValidationError("Invalid phone number format.")
