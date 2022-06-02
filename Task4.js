/**
 * Class code assignment : 28th May 2022
 * 
 * Part 1 : 
 * 
 *  1. Create an API for the User to do the registration
 *  
 *  
 *         /mba/api/v1/auth/signup
 *  
 *      User - Three types : 
 *                           1. ADMIN
 *                           2. CUSTOMER
 *                           3. THEATER_OWNER
 * 
 * 2. Create an API for the user to do the login
 *  
          /mba/api/v1/auth/signin

          This should return the access token

   3. User should be able to update it's password

         PUT /mba/api/v1/users/  - Only user should be allowed to do this
   
   4. Update the user records other than password
       
        User and ADIM should be able to do the same
        
        PUT /mba/api/v1/users/{id}

 *         
 *
 * 
 * Part 2 :
 *  1. Any one can search a movie
 *  2. Only ADMIN should be able to update a movie details ( Create | Update
 *   | Delete) 
 *  3. Only THEATRE_OWNER | ADMIN should be able to update the theatre 
 *    
 */