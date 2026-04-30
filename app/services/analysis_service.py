import json
from sqlalchemy.orm import Session
from app.agents.research_agent import run_research_agent
from app.agents.planner_agent import run_planner_agent
from app.agents.critic_agent import run_critic_agent
from app.agents.scoring_agent import run_scoring_agent
from app.agents.improve_agent import run_improvement_agent
from app.db import crud

def perform_analysis(db: Session, user_id: int, idea: str, budget: int):
    """Orchestrate the multi-agent analysis flow."""
    try:
        # 1. Research
        research = run_research_agent(idea)
        research_text = json.dumps(research)
        
        # 2. Planning
        plan = run_planner_agent(idea, budget, research_text)
        plan_text = json.dumps(plan)
        
        # 3. Critique
        critique = run_critic_agent(plan_text)
        critique_text = json.dumps(critique)

        # 4. Scoring
        confidence = run_scoring_agent(idea, plan_text, critique_text)
        confidence_text = json.dumps(confidence)

        # 5. Save to DB
        db_analysis = crud.create_analysis(
            db=db,
            user_id=user_id,
            idea=idea,
            budget=budget,
            research=research_text,
            plan=plan_text,
            critique=critique_text,
            confidence=confidence_text
        )

        return {
            "success": True,
            "id": db_analysis.id,
            "idea": idea,
            "budget": budget,
            "research": research,
            "plan": plan,
            "critique": critique,
            "confidence": confidence
        }

    except Exception as e:
        print(f"Analysis Service Error: {str(e)}")
        raise e

def perform_improvement(db: Session, user_id: int, analysis_id: int, idea: str, budget: int, previous_plan: dict, previous_critique: dict):
    """Orchestrate the improvement flow."""
    try:
        improved_plan = run_improvement_agent(idea, budget, previous_plan, previous_critique)
        
        if analysis_id:
            analysis = crud.get_analysis_by_id(db, analysis_id, user_id)
            if analysis:
                crud.update_improved_plan(db, analysis, json.dumps(improved_plan))
        
        return {
            "success": True,
            "improved_plan": improved_plan
        }
    except Exception as e:
        print(f"Improvement Service Error: {str(e)}")
        raise e
