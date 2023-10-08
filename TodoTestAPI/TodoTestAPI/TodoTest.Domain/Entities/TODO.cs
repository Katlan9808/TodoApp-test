using System;
using System.Collections.Generic;

namespace TodoTest.Domain.Entities;

public partial class TODO
{
    public Guid ID { get; set; }

    public string? DESCRIPTION { get; set; }

    public string? STATE { get; set; }
}
