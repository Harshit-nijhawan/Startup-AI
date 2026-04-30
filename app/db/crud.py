from sqlalchemy.orm import Session
from app.db.models import User, Analysis
from app.core.security import hash_password

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, email: str, password: str):
    db_user = User(
        email=email,
        password_hash=hash_password(password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_analysis(db: Session, user_id: int, idea: str, budget: int, research: str, plan: str, critique: str, confidence: str):
    db_analysis = Analysis(
        user_id=user_id,
        idea=idea,
        budget=budget,
        research=research,
        plan=plan,
        critique=critique,
        confidence=confidence
    )
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    return db_analysis

def get_user_history(db: Session, user_id: int, limit: int = 10):
    return (
        db.query(Analysis)
        .filter(Analysis.user_id == user_id)
        .order_by(Analysis.created_at.desc())
        .limit(limit)
        .all()
    )

def get_analysis_by_id(db: Session, analysis_id: int, user_id: int):
    return db.query(Analysis).filter(
        Analysis.id == analysis_id,
        Analysis.user_id == user_id
    ).first()

def delete_analysis(db: Session, analysis: Analysis):
    db.delete(analysis)
    db.commit()
    return True

def update_improved_plan(db: Session, analysis: Analysis, improved_plan: str):
    analysis.improved_plan = improved_plan
    db.commit()
    db.refresh(analysis)
    return analysis
