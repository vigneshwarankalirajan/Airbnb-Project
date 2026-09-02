from sqlalchemy.orm import Session

from app.models.host_wallet import HostWallet

from app.schemas.host_wallet import (
    HostWalletCreate,
    HostWalletUpdate,
)


def get_host_wallets(db: Session):

    return db.query(HostWallet).all()


def get_host_wallet(
    db: Session,
    wallet_id: int
):

    return (
        db.query(HostWallet)
        .filter(HostWallet.id == wallet_id)
        .first()
    )


def create_host_wallet(
    db: Session,
    wallet_data: HostWalletCreate
):

    new_wallet = HostWallet(
        **wallet_data.model_dump()
    )

    db.add(new_wallet)
    db.commit()
    db.refresh(new_wallet)

    return new_wallet


def update_host_wallet(
    db: Session,
    wallet_id: int,
    wallet_data: HostWalletUpdate
):

    wallet = get_host_wallet(
        db,
        wallet_id
    )

    if not wallet:
        return None

    update_data = wallet_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(wallet, key, value)

    db.commit()
    db.refresh(wallet)

    return wallet


def delete_host_wallet(
    db: Session,
    wallet_id: int
):

    wallet = get_host_wallet(
        db,
        wallet_id
    )

    if not wallet:
        return None

    db.delete(wallet)
    db.commit()

    return wallet