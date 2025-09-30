from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from enum import Enum
from datetime import datetime
import uuid


class PortfolioType(str, Enum):
    VIDEO_SCRIPTS = "Video Scripts"
    CONTENT_PACKAGE = "Content Package"
    CHANNEL_COPY = "Channel Copy"
    LEAD_MAGNET = "Lead Magnet"
    EMAIL_MARKETING = "Email Marketing"
    THUMBNAIL_COPY = "Thumbnail Copy"


class InquiryStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    IN_PROGRESS = "in-progress"
    COMPLETED = "completed"
    CLOSED = "closed"


# Portfolio Models
class PortfolioItemBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    client: str = Field(..., min_length=1, max_length=100)
    type: PortfolioType
    description: str = Field(..., min_length=1, max_length=500)
    results: str = Field(..., min_length=1, max_length=300)
    tags: List[str] = Field(default=[], max_items=10)
    is_active: bool = Field(default=True)


class PortfolioItemCreate(PortfolioItemBase):
    pass


class PortfolioItemUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    client: Optional[str] = Field(None, min_length=1, max_length=100)
    type: Optional[PortfolioType] = None
    description: Optional[str] = Field(None, min_length=1, max_length=500)
    results: Optional[str] = Field(None, min_length=1, max_length=300)
    tags: Optional[List[str]] = Field(None, max_items=10)
    is_active: Optional[bool] = None


class PortfolioItem(PortfolioItemBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True


# Testimonial Models
class TestimonialBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    channel: str = Field(..., min_length=1, max_length=100)
    subscribers: str = Field(..., min_length=1, max_length=20)
    testimonial: str = Field(..., min_length=1, max_length=1000)
    rating: int = Field(..., ge=1, le=5)
    is_active: bool = Field(default=True)


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    channel: Optional[str] = Field(None, min_length=1, max_length=100)
    subscribers: Optional[str] = Field(None, min_length=1, max_length=20)
    testimonial: Optional[str] = Field(None, min_length=1, max_length=1000)
    rating: Optional[int] = Field(None, ge=1, le=5)
    is_active: Optional[bool] = None


class Testimonial(TestimonialBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True


# Stats Models
class StatsBase(BaseModel):
    number: str = Field(..., min_length=1, max_length=20)
    label: str = Field(..., min_length=1, max_length=100)
    order: int = Field(..., ge=0)


class StatsCreate(StatsBase):
    pass


class StatsUpdate(BaseModel):
    number: Optional[str] = Field(None, min_length=1, max_length=20)
    label: Optional[str] = Field(None, min_length=1, max_length=100)
    order: Optional[int] = Field(None, ge=0)


class Stats(StatsBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True


# Contact Inquiry Models
class ContactInquiryBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    channel: Optional[str] = Field(None, max_length=100)
    subscribers: Optional[str] = Field(None, max_length=20)
    service: str = Field(..., min_length=1, max_length=50)
    project: Optional[str] = Field(None, max_length=50)
    budget: Optional[str] = Field(None, max_length=20)
    message: str = Field(..., min_length=1, max_length=2000)


class ContactInquiryCreate(ContactInquiryBase):
    pass


class ContactInquiryUpdate(BaseModel):
    status: Optional[InquiryStatus] = None


class ContactInquiry(ContactInquiryBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: InquiryStatus = Field(default=InquiryStatus.NEW)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True