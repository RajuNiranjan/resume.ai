from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")


def get_hash_password(password:str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password, hased_password) -> bool:
    return pwd_context.verify(plain_password, hased_password)