from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from models import (
    PortfolioItem, PortfolioItemCreate, PortfolioItemUpdate,
    Testimonial, TestimonialCreate, TestimonialUpdate,
    Stats, StatsCreate, StatsUpdate,
    ContactInquiry, ContactInquiryCreate, ContactInquiryUpdate,
    PortfolioType, InquiryStatus
)
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os
import logging

logger = logging.getLogger(__name__)

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

router = APIRouter()


# Helper function to convert MongoDB document to dict
def document_helper(document) -> dict:
    if document:
        document["id"] = str(document["_id"])
        document.pop("_id", None)
        return document
    return None


# Portfolio Routes
@router.get("/portfolio", response_model=List[PortfolioItem])
async def get_portfolio_items(
    type_filter: Optional[PortfolioType] = Query(None, alias="type"),
    active_only: bool = Query(True, alias="active")
):
    """Get all portfolio items with optional filtering"""
    try:
        query = {}
        if active_only:
            query["is_active"] = True
        if type_filter:
            query["type"] = type_filter.value
        
        cursor = db.portfolio_items.find(query).sort("created_at", -1)
        portfolio_items = await cursor.to_list(1000)
        return [document_helper(item) for item in portfolio_items]
    except Exception as e:
        logger.error(f"Error fetching portfolio items: {e}")
        raise HTTPException(status_code=500, detail="Error fetching portfolio items")


@router.post("/portfolio", response_model=PortfolioItem)
async def create_portfolio_item(item: PortfolioItemCreate):
    """Create a new portfolio item"""
    try:
        portfolio_item = PortfolioItem(**item.dict())
        item_dict = portfolio_item.dict()
        item_dict["_id"] = item_dict.pop("id")
        
        result = await db.portfolio_items.insert_one(item_dict)
        if result.inserted_id:
            created_item = await db.portfolio_items.find_one({"_id": result.inserted_id})
            return document_helper(created_item)
        
        raise HTTPException(status_code=500, detail="Failed to create portfolio item")
    except Exception as e:
        logger.error(f"Error creating portfolio item: {e}")
        raise HTTPException(status_code=500, detail="Error creating portfolio item")


@router.put("/portfolio/{item_id}", response_model=PortfolioItem)
async def update_portfolio_item(item_id: str, item_update: PortfolioItemUpdate):
    """Update a portfolio item"""
    try:
        update_data = {k: v for k, v in item_update.dict().items() if v is not None}
        if update_data:
            update_data["updated_at"] = datetime.utcnow()
            
            result = await db.portfolio_items.update_one(
                {"_id": item_id},
                {"$set": update_data}
            )
            
            if result.modified_count:
                updated_item = await db.portfolio_items.find_one({"_id": item_id})
                return document_helper(updated_item)
        
        raise HTTPException(status_code=404, detail="Portfolio item not found or no changes made")
    except Exception as e:
        logger.error(f"Error updating portfolio item: {e}")
        raise HTTPException(status_code=500, detail="Error updating portfolio item")


@router.delete("/portfolio/{item_id}")
async def delete_portfolio_item(item_id: str):
    """Delete a portfolio item"""
    try:
        result = await db.portfolio_items.delete_one({"_id": item_id})
        if result.deleted_count:
            return {"message": "Portfolio item deleted successfully"}
        
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    except Exception as e:
        logger.error(f"Error deleting portfolio item: {e}")
        raise HTTPException(status_code=500, detail="Error deleting portfolio item")


# Testimonial Routes
@router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(active_only: bool = Query(True, alias="active")):
    """Get all testimonials"""
    try:
        query = {}
        if active_only:
            query["is_active"] = True
            
        cursor = db.testimonials.find(query).sort("created_at", -1)
        testimonials = await cursor.to_list(1000)
        return [document_helper(testimonial) for testimonial in testimonials]
    except Exception as e:
        logger.error(f"Error fetching testimonials: {e}")
        raise HTTPException(status_code=500, detail="Error fetching testimonials")


@router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate):
    """Create a new testimonial"""
    try:
        testimonial_obj = Testimonial(**testimonial.dict())
        testimonial_dict = testimonial_obj.dict()
        testimonial_dict["_id"] = testimonial_dict.pop("id")
        
        result = await db.testimonials.insert_one(testimonial_dict)
        if result.inserted_id:
            created_testimonial = await db.testimonials.find_one({"_id": result.inserted_id})
            return document_helper(created_testimonial)
        
        raise HTTPException(status_code=500, detail="Failed to create testimonial")
    except Exception as e:
        logger.error(f"Error creating testimonial: {e}")
        raise HTTPException(status_code=500, detail="Error creating testimonial")


# Stats Routes
@router.get("/stats", response_model=List[Stats])
async def get_stats():
    """Get all stats ordered by order field"""
    try:
        cursor = db.stats.find({}).sort("order", 1)
        stats = await cursor.to_list(1000)
        return [document_helper(stat) for stat in stats]
    except Exception as e:
        logger.error(f"Error fetching stats: {e}")
        raise HTTPException(status_code=500, detail="Error fetching stats")


@router.put("/stats/{stat_id}", response_model=Stats)
async def update_stats(stat_id: str, stats_update: StatsUpdate):
    """Update a stats item"""
    try:
        update_data = {k: v for k, v in stats_update.dict().items() if v is not None}
        if update_data:
            update_data["updated_at"] = datetime.utcnow()
            
            result = await db.stats.update_one(
                {"_id": stat_id},
                {"$set": update_data}
            )
            
            if result.modified_count:
                updated_stat = await db.stats.find_one({"_id": stat_id})
                return document_helper(updated_stat)
        
        raise HTTPException(status_code=404, detail="Stats item not found or no changes made")
    except Exception as e:
        logger.error(f"Error updating stats: {e}")
        raise HTTPException(status_code=500, detail="Error updating stats")


# Contact Inquiry Routes
@router.post("/contact", response_model=ContactInquiry)
async def create_contact_inquiry(inquiry: ContactInquiryCreate):
    """Submit a new contact inquiry"""
    try:
        contact_inquiry = ContactInquiry(**inquiry.dict())
        inquiry_dict = contact_inquiry.dict()
        inquiry_dict["_id"] = inquiry_dict.pop("id")
        
        result = await db.contact_inquiries.insert_one(inquiry_dict)
        if result.inserted_id:
            created_inquiry = await db.contact_inquiries.find_one({"_id": result.inserted_id})
            logger.info(f"New contact inquiry received from {inquiry.email}")
            return document_helper(created_inquiry)
        
        raise HTTPException(status_code=500, detail="Failed to submit inquiry")
    except Exception as e:
        logger.error(f"Error creating contact inquiry: {e}")
        raise HTTPException(status_code=500, detail="Error submitting inquiry")


@router.get("/contact", response_model=List[ContactInquiry])
async def get_contact_inquiries(
    status: Optional[InquiryStatus] = Query(None),
    limit: int = Query(50, le=100)
):
    """Get contact inquiries (admin only - future authentication)"""
    try:
        query = {}
        if status:
            query["status"] = status.value
            
        cursor = db.contact_inquiries.find(query).sort("created_at", -1).limit(limit)
        inquiries = await cursor.to_list(limit)
        return [document_helper(inquiry) for inquiry in inquiries]
    except Exception as e:
        logger.error(f"Error fetching contact inquiries: {e}")
        raise HTTPException(status_code=500, detail="Error fetching contact inquiries")


@router.put("/contact/{inquiry_id}/status", response_model=ContactInquiry)
async def update_inquiry_status(inquiry_id: str, status_update: ContactInquiryUpdate):
    """Update inquiry status (admin only - future authentication)"""
    try:
        update_data = {"updated_at": datetime.utcnow()}
        if status_update.status:
            update_data["status"] = status_update.status.value
            
        result = await db.contact_inquiries.update_one(
            {"_id": inquiry_id},
            {"$set": update_data}
        )
        
        if result.modified_count:
            updated_inquiry = await db.contact_inquiries.find_one({"_id": inquiry_id})
            return document_helper(updated_inquiry)
        
        raise HTTPException(status_code=404, detail="Contact inquiry not found")
    except Exception as e:
        logger.error(f"Error updating inquiry status: {e}")
        raise HTTPException(status_code=500, detail="Error updating inquiry status")