﻿namespace DAL.Models
{
    public class ServiceLocation
    {
        public Guid ServiceId { get; set; }
        public Guid LocationId { get; set; }
        public Service Service { get; set; }
        public Location Location { get; set; }
    }
}
