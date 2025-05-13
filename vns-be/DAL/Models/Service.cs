﻿using DAL.Models.Enum;

namespace DAL.Models
{
    public class Service
    {
        public int ServiceId { get; set; }
        public Guid PartnerId { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public int? Availability { get; set; }
        public ServiceType ServiceType { get; set; }
        public required string Location { get; set; }
        public List<ComboService> ComboServices { get; } = [];        
        public List<ServicePromotion> ServicePromotions { get; } = [];
    }
}
