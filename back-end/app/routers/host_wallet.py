from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.host_wallet import (
    HostWalletCreate,
    HostWalletResponse,
    HostWalletUpdate,
)

from app.crud.host_wallet import (
    get_host_wallets,
    get_host_wallet,
    create_host_wallet,
    update_host_wallet,
    delete_host_wallet,
)


router = APIRouter(
    prefix="/host-wallets",
    tags=["Host Wallets"]
)


@router.get(
    "/",
    response_model=list[HostWalletResponse]
)
def read_host_wallets(
    db: Session = Depends(get_db)
):

    return get_host_wallets(db)


@router.get(
    "/{wallet_id}",
    response_model=HostWalletResponse
)
def read_host_wallet(
    wallet_id: int,
    db: Session = Depends(get_db)
):

    wallet = get_host_wallet(
        db,
        wallet_id
    )

    if not wallet:
        raise HTTPException(
            status_code=404,
            detail="Host wallet not found"
        )

    return wallet


@router.post(
    "/",
    response_model=HostWalletResponse
)
def create_new_host_wallet(
    wallet_data: HostWalletCreate,
    db: Session = Depends(get_db)
):

    return create_host_wallet(
        db,
        wallet_data
    )


@router.put(
    "/{wallet_id}",
    response_model=HostWalletResponse
)
def update_existing_host_wallet(
    wallet_id: int,
    wallet_data: HostWalletUpdate,
    db: Session = Depends(get_db)
):

    wallet = update_host_wallet(
        db,
        wallet_id,
        wallet_data
    )

    if not wallet:
        raise HTTPException(
            status_code=404,
            detail="Host wallet not found"
        )

    return wallet


@router.delete(
    "/{wallet_id}"
)
def delete_existing_host_wallet(
    wallet_id: int,
    db: Session = Depends(get_db)
):

    wallet = delete_host_wallet(
        db,
        wallet_id
    )

    if not wallet:
        raise HTTPException(
            status_code=404,
            detail="Host wallet not found"
        )

    return {
        "message": "Host wallet deleted successfully",
        "id": wallet_id
    }