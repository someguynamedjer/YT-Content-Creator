import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Mock data to seed the database
portfolio_items = [
    {
        "title": "Travel Vlog Script Series",
        "client": "Adventure Seekers Channel",
        "type": "Video Scripts",
        "description": "Created engaging 10-minute travel vlog scripts for a 500K subscriber channel, focusing on storytelling and audience retention.",
        "results": "Increased average watch time by 23% and comments by 45%",
        "tags": ["Travel", "Scripts", "Storytelling"],
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "title": "Food Channel Content Multiplier",
        "client": "Tasty Adventures",
        "type": "Content Package",
        "description": "Transformed 5 recipe videos into blog posts, Instagram carousels, and email newsletter content.",
        "results": "Generated 15K additional website visits and 2.3K email subscribers",
        "tags": ["Food", "Content Multiplication", "Email Marketing"],
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "title": "Tech Review Channel Optimization",
        "client": "Tech Insider Pro",
        "type": "Channel Copy",
        "description": "Rewrote channel description, about page, and created video title templates for consistency.",
        "results": "Improved click-through rate by 18% and subscriber conversion by 12%",
        "tags": ["Tech", "Optimization", "Copywriting"],
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "title": "Paris Travel Guide Bundle",
        "client": "City Wanderer",
        "type": "Lead Magnet",
        "description": "Created comprehensive 25-page Paris travel guide with itineraries, restaurant recommendations, and insider tips.",
        "results": "Downloaded 3.2K times, generated $8,400 in affiliate revenue",
        "tags": ["Travel", "Lead Magnets", "Guides"],
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "title": "Fitness Channel Email Sequence",
        "client": "FitLife Journey",
        "type": "Email Marketing",
        "description": "Developed 7-part welcome email sequence for fitness YouTuber's audience building strategy.",
        "results": "Achieved 42% open rate and 15% click-through rate",
        "tags": ["Fitness", "Email Sequence", "Audience Building"],
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "title": "Gaming Channel Thumbnail Copy",
        "client": "Epic Gaming Hub",
        "type": "Thumbnail Copy",
        "description": "Created compelling thumbnail text and titles for gaming content to improve click-through rates.",
        "results": "Average CTR increased from 4.2% to 7.8%",
        "tags": ["Gaming", "Thumbnails", "CTR Optimization"],
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

testimonials = [
    {
        "name": "Sarah Chen",
        "channel": "Travel With Sarah",
        "subscribers": "245K",
        "testimonial": "The Content Multiplier package was a game-changer! My single video about Tokyo turned into 15 pieces of content across all platforms. My email list grew by 40% that month.",
        "rating": 5,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "name": "Mike Rodriguez",
        "channel": "Foodie Adventures",
        "subscribers": "156K",
        "testimonial": "Working with this writer transformed how I think about content. The travel guides they created became my top lead magnets, generating over $12K in affiliate revenue.",
        "rating": 5,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "name": "Emma Thompson",
        "channel": "Fitness Forward",
        "subscribers": "89K",
        "testimonial": "The email sequences were perfectly crafted for my audience. Open rates jumped to 45% and I finally started building a real community outside of YouTube.",
        "rating": 5,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "name": "David Park",
        "channel": "Tech Simplified",
        "subscribers": "312K",
        "testimonial": "Professional, fast, and incredibly strategic. They understand how to write for YouTube audiences better than anyone I've worked with.",
        "rating": 5,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

stats = [
    {
        "number": "150+",
        "label": "YouTube Channels Helped",
        "order": 0,
        "updated_at": datetime.utcnow()
    },
    {
        "number": "2M+",
        "label": "Words Written",
        "order": 1,
        "updated_at": datetime.utcnow()
    },
    {
        "number": "45%",
        "label": "Average Engagement Increase",
        "order": 2,
        "updated_at": datetime.utcnow()
    },
    {
        "number": "$250K+",
        "label": "Revenue Generated for Clients",
        "order": 3,
        "updated_at": datetime.utcnow()
    }
]


async def seed_database():
    """Seed the database with initial data"""
    try:
        # Database connection
        mongo_url = os.environ['MONGO_URL']
        client = AsyncIOMotorClient(mongo_url)
        db = client[os.environ['DB_NAME']]
        
        # Clear existing data
        logger.info("Clearing existing data...")
        await db.portfolio_items.delete_many({})
        await db.testimonials.delete_many({})
        await db.stats.delete_many({})
        
        # Add IDs to documents
        for item in portfolio_items:
            import uuid
            item["_id"] = str(uuid.uuid4())
            
        for testimonial in testimonials:
            import uuid
            testimonial["_id"] = str(uuid.uuid4())
            
        for stat in stats:
            import uuid
            stat["_id"] = str(uuid.uuid4())
        
        # Insert portfolio items
        logger.info("Seeding portfolio items...")
        result = await db.portfolio_items.insert_many(portfolio_items)
        logger.info(f"Inserted {len(result.inserted_ids)} portfolio items")
        
        # Insert testimonials
        logger.info("Seeding testimonials...")
        result = await db.testimonials.insert_many(testimonials)
        logger.info(f"Inserted {len(result.inserted_ids)} testimonials")
        
        # Insert stats
        logger.info("Seeding stats...")
        result = await db.stats.insert_many(stats)
        logger.info(f"Inserted {len(result.inserted_ids)} stats")
        
        logger.info("Database seeding completed successfully!")
        
        # Close connection
        client.close()
        
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        raise


if __name__ == "__main__":
    asyncio.run(seed_database())