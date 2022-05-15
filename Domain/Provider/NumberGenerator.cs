using System;
using System.Text;
namespace Port.Domain.Provider
{
    public class NumberGenerator
    {

        private readonly Random _random;
        public NumberGenerator(Random random)
        {
            _random=random;
        }
        //private readonly Random _random = new Random();
        public string Random()
        {
            var passwordBuilder = new StringBuilder();
            // 4-Letters lower case   
            passwordBuilder.Append(RandomString(4));
            passwordBuilder.Append('-');
            // 4-Digits between 1000 and 9999  
            passwordBuilder.Append(RandomNumber(1000, 9999));
            passwordBuilder.Append('-');
            // 2-Letters upper case  
            passwordBuilder.Append(RandomString(1)+_random.Next(1, 9));
            return passwordBuilder.ToString();
        }
        public int RandomNumber(int min, int max)
        {
            return _random.Next(min, max);
        }
        public string RandomString(int size)
        {
            var builder = new StringBuilder(size);
            char offset = 'A';
            const int lettersOffset = 26; // A...Z or a..z: length = 26  
            for (var i = 0; i < size; i++)
            {
                var @char = (char)_random.Next(offset, offset + lettersOffset);
                builder.Append(@char);
            }
            return  builder.ToString();
        }
    }
}