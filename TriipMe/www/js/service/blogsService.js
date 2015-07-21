TriipMeApp.service('blogsService',function(){
	var vm = this;	
	vm.getBlogs = getBlogs;		
	function getBlogs(userId){
		var blogsRef = fb.child("database").child("blogs");
		var blogs = [];
		blogsRef.orderByChild("author").equalTo(userId).limitToLast(5).on("child_added", function(snapshot) {
            var blog = snapshot.val();
            blog.time = (new Date(blog.time)).toDateString();
            blog.id = snapshot.key();
            blogs.push(blog);                   
        });
        return blogs;
	}
})