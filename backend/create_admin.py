from getpass import getpass

from sqlalchemy import select

from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.admin import Admin


def create_admin() -> None:
    print("\nCreate Glexa Digital administrator\n")

    full_name = input("Full name: ").strip()
    email = input("Email: ").strip().lower()
    password = getpass("Password: ")
    confirm_password = getpass("Confirm password: ")

    if len(full_name) < 2:
        print("Full name must contain at least 2 characters.")
        return

    if "@" not in email:
        print("Please enter a valid email address.")
        return

    if len(password) < 12:
        print("Password must contain at least 12 characters.")
        return

    if len(password.encode("utf-8")) > 72:
        print("Password must not exceed 72 bytes.")
        return

    if password != confirm_password:
        print("Passwords do not match.")
        return

    db = SessionLocal()

    try:
        existing_admin = db.scalar(
            select(Admin).where(Admin.email == email)
        )

        if existing_admin:
            print("An administrator with this email already exists.")
            return

        admin = Admin(
            full_name=full_name,
            email=email,
            password_hash=hash_password(password),
            is_active=True,
        )

        db.add(admin)
        db.commit()

        print("\nAdministrator created successfully.")

    except Exception:
        db.rollback()
        print("\nUnable to create administrator.")
        raise

    finally:
        db.close()


if __name__ == "__main__":
    create_admin()