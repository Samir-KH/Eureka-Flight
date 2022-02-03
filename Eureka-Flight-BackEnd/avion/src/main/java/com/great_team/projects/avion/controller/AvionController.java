package com.great_team.projects.avion.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.great_team.projects.avion.entity.Avion;
import com.great_team.projects.avion.service.AvionService;

@RestController
@RequestMapping("/great_team/avion")
@CrossOrigin
public class AvionController {
	
	private AvionService avionService;
	
	@Autowired
	public AvionController(AvionService avionService) {
		 this.avionService =  avionService;
	}
	
	@GetMapping("/all")
	public List<Avion> getAvionList() {
		return avionService.getAvionList();
	}
	@GetMapping("/availabale")
	public List<Avion> getAvailableAvionList() {
		return avionService.getAvailabaleAvion();
	}
	@GetMapping("/{id}")
	public Optional<Avion> getAvionById(@PathVariable("id") Long id) {
		return avionService.getAvionById(id);
	}
	
	/*
	 * this method can be overloaded or we can define name sa a path varibale
	 * 	@GetMapping("/{id}/name")
		public Optional<Avion> getAvionInfoById(@PathVariable("id") Long id) {
		return avionService.getAvionById(id);
	}
	 */
	@GetMapping("/{id}/{info}")
	public String getAvionInfoById(@PathVariable("id") Long id, @PathVariable("info") String info) {
		return avionService.getAvionInfoById(id, info);
	}
	@PostMapping("/nouveau")
	public String postAvion(@RequestBody Avion avion) {
		return this.avionService.save(avion);
	}
	@PutMapping("/update")
	public String upDateAvion(@RequestBody Avion avion) {
		return this.avionService.upDate(avion);
	}
	@DeleteMapping("/delete/{id}")
	public String deleteAvion(@PathVariable("id") Long id) {
		 return this.avionService.delete(id);
	}
}
