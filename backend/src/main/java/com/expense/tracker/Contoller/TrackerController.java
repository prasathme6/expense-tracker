package com.expense.tracker.Contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.expense.tracker.Entity.Tracker;
import com.expense.tracker.Service.TrackerService;
import com.expense.tracker.dto.ExpenseCategoryResponse;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost")
public class TrackerController {
	
	@Autowired
	private TrackerService service;
	
	@GetMapping("/all")
	public List<Tracker> getAll(){
		return service.getAll();
	}
	
	@PostMapping("/all")
	public List<Tracker> postAll(@RequestBody Tracker t){
		return service.postAll(t);
	}
	
	@DeleteMapping("/del/{id}")
	public void delExp(@PathVariable Long id) {
		service.delexp(id);
	}
	
	@GetMapping("/total")
	public double getTotal() {
		return service.totalExp();
	}
	
	@GetMapping("/cat")
    public ExpenseCategoryResponse getExpensesByCategory(@RequestParam String cat) {
        return service.getExpensesByCategory(cat);
    }
	
	@GetMapping("/pay")
    public ExpenseCategoryResponse getExpensesByPayment(@RequestParam String pay) {
        return service.getExpensesByPaymentMethod(pay);
    }
}
