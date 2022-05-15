
using System.ComponentModel.DataAnnotations;
namespace Port.Domain.Models
{
public class Ship
{
   [Key]
    public int Id{get;set;}  
    [Required(ErrorMessage ="Name is required")]
    [MaxLength(50,ErrorMessage ="Name should not be more then 50 characters")]
    public string Name {get;set;}
    [Required(ErrorMessage ="Length is Required")]
    public float Length{get;set;}
    [Required(ErrorMessage ="Width is required")]
    public float Width{get;set;}
    
    public string Code{get;set;}

    
}
}