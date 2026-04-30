from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class User(Base):
    """
    Represents a user of the Startup AI Analyzer.
    Handles user authentication and owns analysis records.
    """
    __tablename__ = "users"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # User Identity
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)

    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)

    # Relationship to analyses
    analyses = relationship("Analysis", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}')>"


class Analysis(Base):
    """
    Represents a single startup analysis record.
    Stores all results from the multi-agent system.
    """
    __tablename__ = "analyses"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # Foreign Key to User
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)

    # User Input
    idea = Column(String(500), nullable=False, index=True)
    budget = Column(Integer, nullable=False)

    # Agent Results (stored as JSON strings)
    research = Column(Text, nullable=False)       # JSON string
    plan = Column(Text, nullable=False)           # JSON string
    critique = Column(Text, nullable=False)       # JSON string
    confidence = Column(Text, nullable=True)      # JSON string (optional)
    improved_plan = Column(Text, nullable=True)   # JSON string (optional, for improved plans)

    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)

    # Relationship back to user
    user = relationship("User", back_populates="analyses")

    def __repr__(self):
        return f"<Analysis(id={self.id}, user_id={self.user_id}, idea='{self.idea}', budget=₹{self.budget})>"
